declare const pumlhorse: any;

pumlhorse.module('pumlhorse-webserver')
  .injector('$webserverResponse', ($scope) => $scope.__webserverResponse)
  .function('ok', ok)
  .function('noContent', noContent)
  .function('badRequest', badRequest)
  .function('notFound', notFound)
  .function('serverError', serverError)
  .function('html', writeView);

function ok($all, $webserverResponse, $scope) {
    end($webserverResponse, 200, $all, $scope)
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