"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var supabase_service_1 = require("./supabase/supabase.service");
var products_controller_1 = require("./products/products.controller");
var products_service_1 = require("./products/products.service");
var auth_controller_1 = require("./auth/auth.controller");
var auth_service_1 = require("./auth/auth.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            controllers: [products_controller_1.ProductsController, auth_controller_1.AuthController],
            providers: [supabase_service_1.SupabaseService, products_service_1.ProductsService, auth_service_1.AuthService],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
