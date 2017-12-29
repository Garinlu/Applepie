<?php

namespace ET\PlatformBundle\Controller;
use FOS\RestBundle\Controller\Annotations as Rest;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;
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


}
