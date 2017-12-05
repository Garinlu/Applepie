<?php

namespace ET\PlatformBundle\Controller;

use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\ProductOrder;
use ET\PlatformBundle\Entity\Product;
use FOS\RestBundle\Controller\Annotations as Rest;
use ET\PlatformBundle\Entity\ProductDetail;
use ET\PlatformBundle\Entity\Business;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
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
     * Get all products or products of a business
     *
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
            $productsMana = $this->container->get('et_platform.products');
            $datas = $productsMana->getProductsOfBusiness($id_business);
            return $datas;
        }

        return $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:Product')
            ->findAll();
    }

    /**
     *
     * @Rest\Route("/dert")
     */
    public function getProductsFreeAction()
    {
        $productsMana = $this->container->get('et_platform.products');
        return $productsMana->getProductsFree();
    }

    /**
     * Get all detail of products
     *
     * @Rest\Route("/products/details")
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
     * Get all Business.
     * @Rest\Route("/business")
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

        $productsMana = $this->container->get('et_platform.products');
        $datas = $productsMana->addProduct($name, $price, $quantity);

        return $datas;

    }

    /**
     * Adding a business
     *
     * @param Request $request
     * @return Business
     */
    public function putBusinessAction(Request $request)
    {
        $name = $request->request->get('name');
        $productsMana = $this->container->get('et_platform.products');
        return $productsMana->addBusiness($name);
    }

    /**
     * Add a product to the business, need the quantity
     *
     * @param Request $request
     * @return BusinessProduct|\Exception
     */
    public function putBusinessProductAction(Request $request)
    {
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

        $productsMana = $this->container->get('et_platform.products');
        return $productsMana->addProductToBusiness($id_product, $id_business, $quantity);
    }


    /**
     * @param Request $request
     */
    public function deleteProductAction(Request $request)
    {
        /*$id_product = $request->request->get('id_product');
        if (!$id_product)
        {
            throw $this->createNotFoundException(
                'No productbuy found'
            );
        }
        $manager = $this->getDoctrine()->getManager();

        $product = $manager->getRepository('ETPlatformBundle:ProductOrder')->find($id_product);
        $manager->remove($product);
        $manager->flush();*/
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
     *
     * @Rest\Route("/business/user")
     * @param Request $request
     */
    public function postBusinessUserAction(Request $request)
    {
        $id_user = $request->request->get("id_user");
        $id_business = $request->request->get("id_business");


        $productsMana = $this->container->get('et_platform.products');
        return $productsMana->addUserToBusiness($id_user, $id_business);
    }
}
