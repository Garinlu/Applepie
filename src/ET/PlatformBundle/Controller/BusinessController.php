<?php

namespace ET\PlatformBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;

use ET\PlatformBundle\Entity\BusinessProduct;
use ET\PlatformBundle\Entity\Business;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * @Rest\View()
 */
class BusinessController extends Controller
{

    /**
     * Get all my business
     * @Rest\Route("/all")
     *
     * @return array
     */
    public function getBusinessesAction()
    {
        return $this->get('security.token_storage')->getToken()->getUser()->getBusiness();
    }

    /**
     * Get all Business or only one if param id isset.
     * @Rest\Route("/{id}")
     *
     */
    public function getBusinessAction(Request $request)
    {
        $id_business = $request->get('id');
        if (!$id_business)
        {
            throw new HttpException(500,
                'Aucun business trouvé'
            );
        }

        if (!$this->areYouInBusiness($id_business))
            throw new HttpException(500,
                'Vous n\'êtes pas autorisé à editer ce business'
            );
        return $this
            ->getDoctrine()
            ->getManager()
            ->getRepository('ETPlatformBundle:Business')->find($id_business);
    }

    /**
     *
     * @Rest\Route("/users/{id}")
     * @param Request $request
     */
    public function getUsersNotBusinessAction(Request $request)
    {
        $id_business = $request->get("id");

        if (!$this->areYouInBusiness($id_business))
            throw new HttpException(500,
                'Vous n\'êtes pas autorisé à editer ce business'
            );


        $productsMana = $this->container->get('et_platform.business');
        return $productsMana->getUsersNotBusiness($id_business);
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

        if (!$this->areYouInBusiness($id_business))
            throw new HttpException(500,
                'Vous n\'êtes pas autorisé à editer ce business'
            );


        $productsMana = $this->container->get('et_platform.business');
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
            throw new HttpException(500,
                'Ce produit n\'existe pas'
            );
        if (!$id_business = $request->request->get('id_business'))
            throw new HttpException(500,
                'Ce business n\'existe pas'
            );
        if (!$quantity = $request->request->get('quantity'))
            throw new HttpException(500,
                'Aucune quantité trouvée'
            );

        if (!$this->areYouInBusiness($id_business))
            throw new HttpException(500,
                'Vous n\'êtes pas autorisé à editer ce business'
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
        if (!$this->areYouInBusiness($businessProduct->getBusiness()->getId()))
            throw new HttpException(500,
                'Vous n\'êtes pas autorisé à editer ce business'
            );
        $manager->remove($businessProduct);
        $manager->flush();
        return true;
    }


    private function areYouInBusiness($id_business)
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ($this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
            return true;
        $business = $this->getDoctrine()->getManager()->getRepository('ETPlatformBundle:Business')->find($id_business);
        return ($user->hasBusiness($business));
    }

}