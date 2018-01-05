<?php

namespace ET\PlatformBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;

use ET\PlatformBundle\Entity\ProductOrder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;


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
        if (!empty($request->query->keys())) {
            $id_business = $request->get('business');
            $id_business = (int)$id_business;
            $group = $request->get('group');

            if (!$id_business) {
                throw $this->createNotFoundException(
                    'No business found'
                );
            }
            $productsMana = $this->container->get('et_platform.product');
            $datas = $productsMana->getProductsOfBusiness($id_business, $group);
            return $datas;
        }

        $productsMana = $this->container->get('et_platform.product');
        $datas = $productsMana->getProducts();
        return $datas;
    }

    /**
     * @Rest\Route("/orders")
     * Get all productsGroup or productsGroup of a business (if key 'business')
     *
     */
    public function getOrdersAction(Request $request)
    {
        return $this->getDoctrine()->getManager()->getRepository('ETPlatformBundle:ProductOrder')
            ->findBy(array(), array('id' => 'DESC'));
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
     * Adding a product order. If this product price are already created, just add an order.
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
     * Edit an order
     *
     * @param Request $request
     * @return void
     */
    public function postOrderAction(Request $request)
    {
        $id_order = $request->request->get('id_order');
        $data = $request->request->all();
        if (!$id_order) {
            throw new HttpException(500,
                'No product order id found'
            );
        }
        $manager = $this->getDoctrine()->getManager();
        $productOrder = $manager->getRepository('ETPlatformBundle:ProductOrder')
            ->find($id_order);
        if (array_key_exists('active',$data)) {
            $productOrder->setActive($data['active']);
        }
        $manager->merge($productOrder);
        $manager->flush();
        return;

    }

    /**
     *
     * @Rest\Route("/order/{id_order}")
     * Delete an order
     *
     * @param Request $request
     * @return bool
     */
    public function deleteProductOrderAction(Request $request)
    {
        $id_order = $request->get('id_order');
        if (!$id_order) {
            throw $this->createNotFoundException(
                'No product order found'
            );
        }
        $manager = $this->getDoctrine()->getManager();
        $productOrder = $manager->getRepository('ETPlatformBundle:ProductOrder')
            ->find($id_order);
        $manager->remove($productOrder);
        $manager->flush();
        return true;
    }

}