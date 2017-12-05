<?php

namespace ET\PlatformBundle\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


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
     * @return mixed
     */
    public function getUserAction()
    {
        $user = $this->get('security.token_storage')->getToken()->getUser();
        if ($this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
        {
            $user->setBusiness( $this
                ->getDoctrine()
                ->getManager()
                ->getRepository('ETPlatformBundle:Business')->findAll());
        }
        return $user;
    }
}
