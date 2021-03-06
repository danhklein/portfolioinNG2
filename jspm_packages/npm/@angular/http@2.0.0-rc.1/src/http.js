/* */ 
"use strict";
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('./facade/lang');
var exceptions_1 = require('./facade/exceptions');
var core_1 = require('@angular/core');
var interfaces_1 = require('./interfaces');
var static_request_1 = require('./static_request');
var base_request_options_1 = require('./base_request_options');
var enums_1 = require('./enums');
function httpRequest(backend, request) {
  return backend.createConnection(request).response;
}
function mergeOptions(defaultOpts, providedOpts, method, url) {
  var newOptions = defaultOpts;
  if (lang_1.isPresent(providedOpts)) {
    return newOptions.merge(new base_request_options_1.RequestOptions({
      method: providedOpts.method || method,
      url: providedOpts.url || url,
      search: providedOpts.search,
      headers: providedOpts.headers,
      body: providedOpts.body
    }));
  }
  if (lang_1.isPresent(method)) {
    return newOptions.merge(new base_request_options_1.RequestOptions({
      method: method,
      url: url
    }));
  } else {
    return newOptions.merge(new base_request_options_1.RequestOptions({url: url}));
  }
}
var Http = (function() {
  function Http(_backend, _defaultOptions) {
    this._backend = _backend;
    this._defaultOptions = _defaultOptions;
  }
  Http.prototype.request = function(url, options) {
    var responseObservable;
    if (lang_1.isString(url)) {
      responseObservable = httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
    } else if (url instanceof static_request_1.Request) {
      responseObservable = httpRequest(this._backend, url);
    } else {
      throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
    }
    return responseObservable;
  };
  Http.prototype.get = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url)));
  };
  Http.prototype.post = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({body: body})), options, enums_1.RequestMethod.Post, url)));
  };
  Http.prototype.put = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({body: body})), options, enums_1.RequestMethod.Put, url)));
  };
  Http.prototype.delete = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Delete, url)));
  };
  Http.prototype.patch = function(url, body, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions.merge(new base_request_options_1.RequestOptions({body: body})), options, enums_1.RequestMethod.Patch, url)));
  };
  Http.prototype.head = function(url, options) {
    return httpRequest(this._backend, new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Head, url)));
  };
  Http.decorators = [{type: core_1.Injectable}];
  Http.ctorParameters = [{type: interfaces_1.ConnectionBackend}, {type: base_request_options_1.RequestOptions}];
  return Http;
}());
exports.Http = Http;
var Jsonp = (function(_super) {
  __extends(Jsonp, _super);
  function Jsonp(backend, defaultOptions) {
    _super.call(this, backend, defaultOptions);
  }
  Jsonp.prototype.request = function(url, options) {
    var responseObservable;
    if (lang_1.isString(url)) {
      url = new static_request_1.Request(mergeOptions(this._defaultOptions, options, enums_1.RequestMethod.Get, url));
    }
    if (url instanceof static_request_1.Request) {
      if (url.method !== enums_1.RequestMethod.Get) {
        exceptions_1.makeTypeError('JSONP requests must use GET request method.');
      }
      responseObservable = httpRequest(this._backend, url);
    } else {
      throw exceptions_1.makeTypeError('First argument must be a url string or Request instance.');
    }
    return responseObservable;
  };
  Jsonp.decorators = [{type: core_1.Injectable}];
  Jsonp.ctorParameters = [{type: interfaces_1.ConnectionBackend}, {type: base_request_options_1.RequestOptions}];
  return Jsonp;
}(Http));
exports.Jsonp = Jsonp;
