<?php

class UrlController extends Controller
{
    private UrlService $urlService;

    public function __construct(UrlService $urlService, Request $request)
    {
        parent::__construct($request);

        $this->urlService = $urlService;
    }


    public function store()
    {
        $user = $this->request->user();
        $userId = $user['user_id'];
        $originalUrl = $this->request->input('original_url');


        $result = $this->urlService->createUrl(
            $userId,
            $originalUrl
        );


        if (!$result['success']) {
            Response::error($result['message']);
        }


        Response::success(
            $result['message'],
            $result['data']
        );
    }



    public function index()
    {
        $user = $this->request->user();
        $userId = $user['user_id'];
        $urls = $this->urlService->getUserUrls($userId);


        Response::success(
            "URLs fetched successfully",
            $urls
        );
    }



    public function delete($id)
    {
        $user = $this->request->user();
        $userId = $user['user_id'];
        $result = $this->urlService->deleteUrl(
            $id,
            $userId
        );


        if (!$result['success']) {
            Response::error($result['message']);
        }


        Response::success(
            $result['message']
        );
    }



    public function redirect($code)
    {
        $result = $this->urlService->redirect($code);


        if (!$result['success']) {
            Response::notFound(
                $result['message']
            );
        }


        header(
            "Location: " . $result['original_url']
        );

        exit;
    }
}