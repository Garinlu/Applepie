<?php
/**
 * Created by PhpStorm.
 * User: lucas
 * Date: 22/12/2017
 * Time: 13:47
 */

namespace ET\PlatformBundle\Service;


use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\Query\ResultSetMappingBuilder;
use ET\PlatformBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ETUserManager
{

    private $tokenStorage;
    private $userManager;
    private $em;

    public function __construct(TokenStorageInterface $tokenStorage, \FOS\UserBundle\Model\UserManager $userManager, \Doctrine\ORM\EntityManager $em)
    {
        $this->tokenStorage = $tokenStorage;
        $this->userManager = $userManager;
        $this->em = $em;
    }

    public function whoAmI()
    {
        return $this->tokenStorage->getToken()->getUser();
    }

    public function editUser($user)
    {
        if (!$user['plainPassword'] || $user['plainPassword'] == $user['plainPasswordVerif']) {
            $currentUser = $this->tokenStorage->getToken()->getUser();
            if (!$currentUser) throw new HttpException("Erreur serveur.");
            if (!$user['firstname']) throw new HttpException("Prénom manquant");
            $currentUser->setFirstname($user['firstname']);
            if (!$user['lastname']) throw new HttpException("Nom manquant");
            $currentUser->setLastname($user['lastname']);
            if (!$user['email']) throw new HttpException("Email manquant");
            $currentUser->setEmail($user['email']);
            if ($user['plainPassword']) {
                $currentUser->setPlainPassword($user['plainPassword']);
            }
            $this->userManager->updateUser($currentUser);
        } else {
            throw new HttpException("Mot de passe non valide.");
        }
        return $currentUser;
    }

    public function createUser($userData)
    {
        $errors = [];
        if (!$userData['firstname']) {
            $errors[] = 'Prénom trop court.';
        }
        if (!$userData['lastname']) {
            $errors[] = 'Nom trop court.';
        }
        if (!$userData['email'] || !filter_var($userData['email'], FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Email incorrect.';
        }
        if (!$userData['username'] || $this->userManager->findUserByUsername($userData['username'])) {
            $errors[] = "Nom d'utilisateur existant.";
        }
        if (!$userData['password']
        ) {
            $errors[] = 'Veuillez ajouter un mot de passe.';
        }
        if (!$userData['gender']) {
            $errors[] = 'Veuillez sélectionner un sexe.';
        }
        if (!$userData['roles']) {
            $errors[] = 'Veuillez sélectionner un rôle.';
        }
        if (!$userData['phone']) {
            $errors[] = 'Veuillez indiquer votre numéro de téléphone.';
        }

        $user = new User();
        $user->setFirstname($userData['firstname']);
        $user->setUsername($userData['username']);
        $user->setLastname($userData['lastname']);
        $user->setEmail($userData['email']);
        $user->setPlainPassword($userData['password']);
        $user->setGender($userData['gender']);
        if (isset($userData['roles']))
            $user->setRoles([$userData['roles']]);
        $user->setPhone($userData['phone']);
        $user->setEnabled(true);

        if (count($errors) == 0) {
            $this->userManager->createUser($user);
            $this->userManager->updatePassword($user);
            $this->userManager->updateUser($user);
        }

        $response = new JsonResponse();
        $response->setData($errors);
        return $response;
    }

    public function postUser($id, $userData)
    {
        $user = $this->em->getRepository('ETPlatformBundle:User')->find($id);
        if ($userData['firstname']) {
            $user->setFirstname($userData['firstname']);
        }
        if ($userData['lastname']) {
            $user->setLastname($userData['lastname']);
        }
        if ($userData['gender']) {
            $user->setGender($userData['gender']);
        }
        if ($userData['roles']) {
            $user->setRoles($userData['roles']);
        }
        if ($userData['phone']) {
            $user->setPhone($userData['phone']);
        }

        $user->setEnabled(true);

        $this->userManager->updateUser($user);
        return;
    }

    public function getAllUsers($name)
    {
        $sqlQuery = "SELECT * 
FROM `fos_user` 
WHERE `firstname` LIKE '%$name%' OR `firstname` LIKE '%$name%' OR `firstname` LIKE '%$name%' 
ORDER BY lastname;";
        $rsm = new ResultSetMappingBuilder($this->em);
        $rsm->addRootEntityFromClassMetadata(User::class, 'fos_user');
        $q = $this->em->createNativeQuery($sqlQuery, $rsm);
        return $q->getResult();
        return $this->em->getRepository('ETPlatformBundle:User')->findBy(array('enabled' => true));
    }
}
