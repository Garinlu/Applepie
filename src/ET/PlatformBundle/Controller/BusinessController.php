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
        return $this->container->get('et_platform.business')
            ->getClassifiedBusiness($this->get('security.token_storage')->getToken()->getUser()->getBusiness());
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
        $this->areYouInBusiness($id_business);

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

        $this->areYouInBusiness($id_business);


        $productsMana = $this->container->get('et_platform.business');
        return $productsMana->getUsersNotBusiness($id_business);
    }

    /**
     *
     * @Rest\Route("/user")
     * @param Request $request
     */
    public function putBusinessUserAction(Request $request)
    {
        $id_user = $request->request->get("id_user");
        if (!$id_user)
            throw new HttpException(500,
                'Merci de choisir un utilisateur parmis la liste (liste qui apparait lors du clique dans la case)'
            );

        $id_business = $request->request->get("id_business");

        $this->areYouInBusiness($id_business);


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

        $this->areYouInBusiness($id_business);
        $productsMana = $this->container->get('et_platform.product');
        return $productsMana->addProductToBusiness($id_product, $id_business, $quantity);
    }

    /**
     *
     * Delete a product on a business
     *
     * @Rest\Route("/product/{id}")
     * @param Request $request
     * @return bool
     */
    public function deleteBusinessProductAction(Request $request)
    {
        $id_businessProduct = $request->get('id');
        if (!$id_businessProduct)
            throw new HttpException(500,
                'Il semblerait que cette utilisation n\'existe pas ou plus. (id: ' . $id_businessProduct . ')'
            );
        $manager = $this->getDoctrine()->getManager();
        $businessProduct = $manager->getRepository('ETPlatformBundle:BusinessProduct')
            ->find($id_businessProduct);
        $this->areYouInBusiness($businessProduct->getBusiness()->getId());
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
        if (!$user->hasBusiness($business)) throw new HttpException(500,
            'Vous n\'êtes pas autorisé à editer ce business'
        );
    }

}