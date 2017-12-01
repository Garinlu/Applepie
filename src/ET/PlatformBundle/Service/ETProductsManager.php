<?php

namespace ET\PlatformBundle\Service;


use ET\PlatformBundle\Entity\Business;
use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\Products;
use ET\PlatformBundle\Entity\ProductsBuy;
use ET\PlatformBundle\Entity\ProductsPrice;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ETProductsManager
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
            $tmp['name'] = $data->getProductPrice()->getProduct()->getName();
            $tmp['price'] = $data->getProductPrice()->getPrice();
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
     * @return ProductsBuy
     */
    public function addProduct($name, $price, $quantity)
    {
        $repoProd = $this->em->getRepository('ETPlatformBundle:Products');
        $repoProdPrice = $this->em->getRepository('ETPlatformBundle:ProductsPrice');
        $product = new Products();
        $product->setName($name);

        if (!$repoProd->findByName($product->getName()))
        {
            $this->em->persist($product);
            $this->em->flush();
        }
        $product = $repoProd->findByName($product->getName())[0];
        if (!$productPrice = $repoProdPrice->findBy(array(
            'product' => $product,
            'price' => $price))[0]
        )
        {
            $productPrice = new ProductsPrice();
            $productPrice->setProduct($product);
            $productPrice->setPrice($price);
        }

        $this->em->persist($productPrice);
        $this->em->flush();

        $productBuy = new ProductsBuy();
        $productBuy->setProductPrice($productPrice);
        $productBuy->setQuantity($quantity);
        $productBuy->setUser($this->user);

        $this->em->persist($productBuy);
        $this->em->flush();

        return $productBuy;
    }

    /**
     * @param $name
     * @return Business
     */
    public function addBusiness($name)
    {
        $business = new Business();
        $business->setName($name);
        $this->em->persist($business);
        $this->em->flush();
        return $business;
    }

    /**
     * @param $id_product
     * @param $id_business
     * @param $quantity
     * @return BusinessProduct|\Exception
     */
    public function addProductToBusiness($id_product, $id_business, $quantity)
    {

        $productPrice = $this->em->getRepository('ETPlatformBundle:ProductsPrice')
            ->find($id_product);
        $business = $this->em->getRepository('ETPlatformBundle:Business')
            ->find($id_business);

        if (($this->getQuantityofProductBuy($id_product) - $this->getQuantityOfProductUsed($id_product)) < $quantity)
            return new \Exception(
                'Quantity is too high'
            );

        $businessProd = new BusinessProduct();
        $businessProd->setProductPrice($productPrice);
        $businessProd->setBusiness($business);
        $businessProd->setQuantity($quantity);
        $businessProd->setUser($this->user);

        $this->em->persist($businessProd);
        $this->em->flush();

        return $businessProd;
    }

    public function getQuantityOfProductUsed($id_product)
    {
        $quantity = 0;
        $products_price = $this->em->getRepository('ETPlatformBundle:ProductsPrice')
            ->find($id_product);
        $products_in_business = $this->em->getRepository('ETPlatformBundle:BusinessProduct')
            ->findBy(array('productPrice' => $products_price));

        foreach ($products_in_business as $product_in_business)
        {
            $quantity += $product_in_business->getQuantity();
        }
        return $quantity;
    }

    public function getQuantityofProductBuy($id_product)
    {
        $quantity = 0;
        $products_price = $this->em->getRepository('ETPlatformBundle:ProductsPrice')
            ->find($id_product);
        $products_buy = $this->em->getRepository('ETPlatformBundle:ProductsBuy')
            ->findBy(array('productPrice' => $products_price));

        foreach ($products_buy as $product_buy)
        {
            $quantity += $product_buy->getQuantity();
        }
        return $quantity;
    }

    public function getProductsFree()
    {
        // TODO fonction renvoyant les produits encore disponible, avec leur prix et leur quantity
        //
    }
}