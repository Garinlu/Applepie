<?php

namespace ET\PlatformBundle\Controller;

use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\ProductsBuy;
use ET\PlatformBundle\Entity\ProductsPrice;
use FOS\RestBundle\Controller\Annotations as Rest;
use ET\PlatformBundle\Entity\Products;
use ET\PlatformBundle\Entity\Business;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Rest\View()
 */
class DefaultController extends Controller
{

    /**
     * Method charge the front Angular
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render('ETPlatformBundle:Default:index.html.twig');
    }

    /**
     *
     * @Rest\Route("/products")
     * Get all products buy (Historic of buying) or product of a business
     *
     * @return array
     */
    public function getProductsAction(Request $request)
    {
        if (!empty($request->query->keys()))
        {
            $id_business = $request->get('business');
            if (!$id_business)
            {
                throw $this->createNotFoundException(
                    'No business found'
                );
            }
            $business = $this->getDoctrine()
                ->getRepository('ETPlatformBundle:Business')
                ->find($id_business);

            return $this->getDoctrine()
                ->getRepository('ETPlatformBundle:BusinessProduct')
                ->findBy(array('business' => $business));
        }

        return $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:ProductsBuy')
            ->findAll();
    }

    /**
     * Get all name of products
     *
     * @return array
     */
    public function getProductsNameAction()
    {
        return $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:Products')
            ->findAll();
    }

    /**
     * Get all Business.
     *
     * @return array
     */
    public function getBusinessAction()
    {
        return $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:Business')->findAll();
    }

    /**
     * @return mixed
     */
    public function getUserAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ($this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
        {
            $businesses = $this->getBusinessAction();
            $user->setBusiness($businesses);
        }
        return $user;
    }

    /**
     *
     * Get all products of a business (formated)
     * @Rest\Get("/business/{id}/products/group")
     *
     * @param Request $request
     * @return array
     */
    public function getBusinessProductsGroupAction(Request $request)
    {
        $datas_tmp = null;
        $id_business = $request->get('id');

        if (!$id_business)
        {
            throw $this->createNotFoundException(
                'No business found'
            );
        }
        $business = $this->getDoctrine()
            ->getRepository('ETPlatformBundle:Business')
            ->find($id_business);

        $datas_tmp = $this->getDoctrine()
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
     * Adding a product buying. If product an product price are already created, just add a productBuy.
     *
     * @param Request $request
     * @return ProductsBuy
     */
    public function putProductAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $repoProd = $doctrine->getRepository('ETPlatformBundle:Products');
        $repoProdPrice = $doctrine->getRepository('ETPlatformBundle:ProductsPrice');
        $em = $doctrine->getManager();
        $name = $request->request->get('name');
        $price = $request->request->get('price');
        $quantity = $request->request->get('quantity');

        $product = new Products();
        $product->setName($name);

        if (!$repoProd->findByName($product->getName()))
        {
            $em->persist($product);
            $em->flush();
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

        $em->persist($productPrice);
        $em->flush();

        $productBuy = new ProductsBuy();
        $productBuy->setProductPrice($productPrice);
        $productBuy->setQuantity($quantity);
        $productBuy->setUser($this->get('security.token_storage')->getToken()->getUser());

        $em->persist($productBuy);
        $em->flush();

        return $productBuy;
    }

    /**
     * Adding a business
     *
     * @param Request $request
     * @return Business
     */
    public function putBusinessAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        $name = $request->request->get('name');

        $business = new Business();
        $business->setName($name);

        $em->persist($business);

        $em->flush();

        return $business;
    }

    /**
     * @param Request $request
     * @return BusinessProduct|\Exception
     */
    public function putBusinessProductAction(Request $request)
    {
        $doctrine = $this->getDoctrine();
        $em = $doctrine->getManager();
        if (!$id_product = $request->request->get('id_product'))
            return new \Exception(
                'No product found'
            );
        if (!$id_business = $request->request->get('id_business'))
            return new \Exception(
                'No business found'
            );
        if (!$quantity = $request->request->get('quantity'))
            return new \Exception(
                'No quantity found'
            );

        $productDetail = $em->getRepository('ETPlatformBundle:ProductsDetails')
            ->find($id_product);
        $business = $em->getRepository('ETPlatformBundle:Business')
            ->find($id_business);

        if ($productDetail->getQuantity() < $quantity)
            return new \Exception(
                'Quantity is too high'
            );

        $businessProd = new BusinessProduct();
        $businessProd->setProductDetails($productDetail);
        $businessProd->setBusiness($business);
        $businessProd->setQuantity($quantity);
        $businessProd->setUser($this->get('security.token_storage')->getToken()->getUser());

        $productDetail->setQuantity($productDetail->getQuantity() - $quantity);

        $em->persist($businessProd);
        $em->merge($productDetail);
        $em->flush();


        return $businessProd;
    }


    /**
     * @param Request $request
     */
    public function deleteProductBuyAction(Request $request)
    {
        $id_product = $request->request->get('id_product');
        if (!$id_product)
        {
            throw $this->createNotFoundException(
                'No productbuy found'
            );
        }
        $manager = $this->getDoctrine()->getManager();

        $product = $manager->getRepository('ETPlatformBundle:ProductsBuy')->find($id_product);
        $manager->remove($product);
        $manager->flush();
    }

    /**
     * @param Request $request
     */
    public function deleteBusinessProductAction(Request $request)
    {
        $id_businessProduct = $request->request->get('id_businessProduct');
        if (!$id_businessProduct)
        {
            throw $this->createNotFoundException(
                'No businessproduct found'
            );
        }
        $manager = $this->getDoctrine()->getManager();
        $businessProduct = $manager->getRepository('ETPlatformBundle:BusinessProduct')
            ->find($id_businessProduct);
        $manager->remove($businessProduct);
        $manager->flush();
    }

    /**
     * @param Request $request
     */
    public function postBusinessUserAction(Request $request)
    {

    }
}
