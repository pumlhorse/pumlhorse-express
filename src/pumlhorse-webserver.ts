declare const pumlhorse: any;

pumlhorse.module('pumlhorse-webserver')
  .injector('$webserverResponse', ($scope) => $scope.__webserverResponse)
  .function('sendResponse', sendResponse)
  .function('ok', ok)
  .function('created', created)
  .function('accepted', accepted)
  .function('noContent', noContent)
  .function('badRequest', badRequest)
  .function('notFound', notFound)
  .function('serverError', serverError)
  .function('html', writeView);

function sendResponse(code, data, $webserverResponse, $scope) {
    end($webserverResponse, code, data, $scope);
}

function ok($all, $webserverResponse, $scope) {
    end($webserverResponse, 200, $all, $scope)
}

function created($all, $webserverResponse, $scope) {
    end($webserverResponse, 201, $all, $scope)
}

function accepted($all, $webserverResponse, $scope) {
    end($webserverResponse, 202, $all, $scope)
}

function noContent($webserverResponse, $scope) {
    end($webserverResponse, 204, null, $scope)
}

function writeView(view, data, $webserverResponse, $scope) {
  $webserverResponse.render(view, data, $scope);
}

function badRequest($all, $webserverResponse, $scope) {
    end($webserverResponse, 400, $all, $scope)
}

function notFound($all, $webserverResponse, $scope) {
    end($webserverResponse, 404, $all, $scope)
}

function serverError($all, $webserverResponse, $scope) {
    end($webserverResponse, 500, $all, $scope)
}

function end(response, code, body, $scope) {
  response.status(code).send(body);
  $scope.end();
}