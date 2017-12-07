<?php

namespace ET\PlatformBundle\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;

use ET\PlatformBundle\Entity\ProductOrder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


/**
 * @Rest\View()
 */
class ProductController extends Controller
{
    /**
     * @Rest\Route("/")
     * Get all productsGroup or productsGroup of a business (if key 'business')
     *
     */
    public function getProductsAction(Request $request)
    {
        if (!empty($request->query->keys()))
        {
            $id_business = $request->get('business');
            $id_business = (int) $id_business;
            $group = $request->get('group');

            if (!$id_business)
            {
                throw $this->createNotFoundException(
                    'No business found'
                );
            }
            $productsMana = $this->container->get('et_platform.product');
            $datas = $productsMana->getProductsOfBusiness($id_business, $group);
            return $datas;
        }

        $products = $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:Product')
            ->findAll();
        $datas = [];
        $index = 0;
        $whichIndex = [];
        foreach ($products as $product) {
            $name = $product->getProductDetail()->getName();
            if (!array_key_exists($name, $whichIndex))
            {
                $datas[$index] = array('name' => $name, 'quantity' => 0,'productsGroup' => array());
                $whichIndex[$name] = $index;
                $index++;
            }
            $datas[$whichIndex[$name]]['productsGroup'][] = $product;
            $datas[$whichIndex[$name]]['quantity'] += $product->getQuantityReal();
        }
        return $datas;
    }

    /**
     * Return productsGroup which quantity is superior than 0.
     *
     * @Rest\Route("/free")
     */
    public function getProductsFreeAction()
    {
        return $this->getDoctrine()->getManager()->getRepository('ETPlatformBundle:Product')
            ->findFreeProduct();
    }

    /**
     * Get all detail of productsGroup
     *
     * @Rest\Route("/details")
     * @return array
     */
    public function getProductsDetailAction()
    {
        return $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:ProductDetail')
            ->findAll();
    }

    /**
     * @Rest\Route("/")
     *
     * Adding a product buying. If product an product price are already created, just add a productBuy.
     *
     * @param Request $request
     * @return ProductOrder
     */
    public function putProductAction(Request $request)
    {
        $name = $request->request->get('name');
        $price = $request->request->get('price');
        $quantity = $request->request->get('quantity');

        $productsMana = $this->container->get('et_platform.product');
        $datas = $productsMana->addProduct($name, $price, $quantity);

        return $datas;

    }


    /**
     *
     * @Rest\Route("/order")
     * Delete an order
     *
     * @param Request $request
     * @return bool
     */
    public function deleteProductOrderAction(Request $request)
    {
        $id_product_order = $request->request->get('id_product_order');
        if (!$id_product_order)
        {
            throw $this->createNotFoundException(
                'No product order found'
            );
        }
        $manager = $this->getDoctrine()->getManager();
        $productOrder = $manager->getRepository('ETPlatformBundle:ProductOrder')
            ->find($id_product_order);
        $manager->remove($productOrder);
        $manager->flush();
        return true;
    }

}