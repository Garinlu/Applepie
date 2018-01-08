<?php

namespace ET\PlatformBundle\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;


/**
 * @Rest\View()
 */
class UserController extends Controller
{

    /**
     * @Rest\Route("/me")
     *
     * @return mixed
     */
    public function getMeAction()
    {
        return $this->get('security.token_storage')->getToken()->getUser();
    }

    /**
     * @Rest\Route("/all")
     *
     * @return mixed
     */
    public function getAllUserAction()
    {
        if (!$this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
            throw new HttpException(401, 'Seul un administrateur peut ajouter un utilisateur');
        $userManager = $this->container->get('et_platform.user');
        $response = $userManager->getAllUsers();
        return $response;
    }

    /**
     * @Rest\Route("{id}")
     */
    public function getUserAction(Request $request)
    {
        $id = $request->get('id');
        if ($id != $this->get('security.token_storage')->getToken()->getUser()->getId() &&
        !$this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
            throw new HttpException('500', 'Seul un administrateur peut éditer un utilisateur différent de vous.');

        $manager = $this->getDoctrine()->getManager();

        $user = $manager->getRepository('ETPlatformBundle:User')
            ->find($id);
        return $user;
    }

    /**
     * @Rest\Route("/createUser")
     */
    public function postCreateUserAction(Request $request)
    {
        if (!$this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
            throw new HttpException('500', 'Seul un administrateur peut ajouter un utilisateur');
        $userManager = $this->container->get('et_platform.user');
        $response = $userManager->createUser(json_decode($request->getContent(), true)["user"]);
        return $response;
    }

    /**
     * @Rest\Route("/{id}")
     */
    public function postUserAction(Request $request)
    {
        if (!$this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
            throw new HttpException('500', 'Seul un administrateur peut éditer un utilisateur');
        $userManager = $this->container->get('et_platform.user');
        $response = $userManager->postUser($request->get('id'), json_decode($request->getContent(), true)['user']);
        return $response;
    }

    /**
     * @Rest\Route("{id}")
     */
    public function deleteUserAction(Request $request)
    {
        if (!$this->container->get('security.authorization_checker')->isGranted('ROLE_ADMIN'))
            throw new HttpException('500', 'Seul un administrateur peut supprimer un utilisateur');

        $id = $request->get('id');
        $manager = $this->getDoctrine()->getManager();

        $productOrder = $manager->getRepository('ETPlatformBundle:User')
            ->find($id);
        $manager->remove($productOrder);
        $manager->flush();

    }
}