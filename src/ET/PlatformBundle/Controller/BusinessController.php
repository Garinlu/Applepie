<?php

namespace ET\PlatformBundle\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;

use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\Business;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


/**
 * @Rest\View()
 */
class BusinessController extends Controller
{

    /**
     * Get all Business.
     * @Rest\Route("/")
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
     *
     * @Rest\Route("/user")
     * @param Request $request
     */
    public function postBusinessUserAction(Request $request)
    {
        $id_user = $request->request->get("id_user");
        $id_business = $request->request->get("id_business");


        $productsMana = $this->container->get('et_platform.product');
        return $productsMana->addUserToBusiness($id_user, $id_business);
    }

    /**
     * Adding a business
     *
     * @Rest\Route("/")
     * @param Request $request
     * @return Business
     */
    public function putBusinessAction(Request $request)
    {
        $name = $request->request->get('name');
        $productsMana = $this->container->get('et_platform.business');
        return $productsMana->addBusiness($name);
    }

    /**
     * Add a product to the business, need the quantity
     *
     * @Rest\Route("/product")
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

        $productsMana = $this->container->get('et_platform.product');
        return $productsMana->addProductToBusiness($id_product, $id_business, $quantity);
    }

    /**
     *
     * Delete a product on a business
     *
     * @Rest\Route("/product")
     * @param Request $request
     * @return bool
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
        return true;
    }

}