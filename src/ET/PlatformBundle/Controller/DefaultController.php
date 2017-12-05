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
     * @Rest\Route("/users")
     *
     * @return mixed
     */
    public function getUserAction()
    {

        return $user;
    }
}
