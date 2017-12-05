<?php

namespace ET\PlatformBundle\Service;


use Doctrine\ORM\Query\ResultSetMapping;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use ET\PlatformBundle\Entity\Business;
use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\ProductDetail;
use ET\PlatformBundle\Entity\ProductOrder;
use ET\PlatformBundle\Entity\Product;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ETProductManager
{
    private $em;
    private $user;

    public function __construct(\Doctrine\ORM\EntityManager $em, TokenStorageInterface $tokenStorage)
    {
        $this->em = $em;
        $this->user = $tokenStorage->getToken()->getUser();
    }

    /**
     * Return products used in a business, classified by group
     * @param $id_business
     * @return array
     */
    public function getProductsOfBusiness($id_business)
    {
        $business = $this->em
            ->getRepository('ETPlatformBundle:Business')
            ->find($id_business);

        $datas_tmp = $this->em
            ->getRepository('ETPlatformBundle:BusinessProduct')
            ->findBy(array('business' => $business));

        $datas = [];
        $name_products = [];
        foreach ($datas_tmp as $data)
        {
            $tmp = [];
            $tmp['id'] = $data->getId();
            $tmp['name'] = $data->getProduct()->getProductDetail()->getName();
            $tmp['price'] = $data->getProduct()->getPrice();
            $tmp['quantity'] = $data->getQuantity();
            $tmp['creationDate'] = $data->getCreationDate();
            $tmp['username'] = $data->getUser()->getUsername();
            if (!array_key_exists($tmp['name'], $name_products))
            {
                $name_products[$tmp['name']] = count($datas);
                $datas[$name_products[$tmp['name']]] = array(
                    'name' => $tmp['name'],
                    'quantity' => 0,
                    'price' => 0,
                    'products' => array());
            }
            $datas[$name_products[$tmp['name']]]['products'][] = $tmp;
            $datas[$name_products[$tmp['name']]]['quantity'] += intval($tmp['quantity']);
            $datas[$name_products[$tmp['name']]]['price'] +=
                intval($tmp['price']) * intval($tmp['quantity']);
        }
        return $datas;
    }

    /**
     * @param $name
     * @param $price
     * @param $quantity
     * @return ProductOrder
     */
    public function addProduct($name, $price, $quantity)
    {
        $repoProdDetail = $this->em->getRepository('ETPlatformBundle:ProductDetail');
        $repoProd = $this->em->getRepository('ETPlatformBundle:Product');
        $productDetail = new ProductDetail();
        $productDetail->setName($name);

        if (!$repoProdDetail->findByName($productDetail->getName()))
        {
            $this->em->persist($productDetail);
            $this->em->flush();
        }
        $productDetail = $repoProdDetail->findByName($productDetail->getName())[0];
        if (!$product = $repoProd->findBy(array(
            'product_detail' => $productDetail,
            'price' => $price))
        )
        {
            $product = new Product();
            $product->setProductDetail($productDetail);
            $product->setPrice($price);
        }
        else
        {
            $product = $product[0];
        }

        $this->em->persist($product);
        $this->em->flush();

        $productOrder = new ProductOrder();
        $productOrder->setProduct($product);
        $productOrder->setQuantity($quantity);
        $productOrder->setUser($this->user);

        $this->em->persist($productOrder);
        $this->em->flush();

        return $productOrder;
    }

    /**
     * @param $id_product
     * @param $id_business
     * @param $quantity
     * @return BusinessProduct|\Exception
     */
    public function addProductToBusiness($id_product, $id_business, $quantity)
    {

        $product = $this->em->getRepository('ETPlatformBundle:Product')
            ->find($id_product);
        $business = $this->em->getRepository('ETPlatformBundle:Business')
            ->find($id_business);

        if ($product->getQuantityReal() < $quantity)
            throw new HttpException(500, 'La quantité est trop élevée. Merci de mettre une valeur inférieure ou égale à celle écrit à côté du nom du produit.');

        $businessProd = new BusinessProduct();
        $businessProd->setProduct($product);
        $businessProd->setBusiness($business);
        $businessProd->setQuantity($quantity);
        $businessProd->setUser($this->user);

        $this->em->persist($businessProd);
        $this->em->flush();

        return $businessProd;
    }


}