import "server-only";

import { ProductRepositoryImpl } from "@/core/infrastructure/repository/ProductRepositoryImpl";
import { UserRepositoryImpl } from "@/core/infrastructure/repository/UserRepositoryImpl";
import { PasswordHasherImpl } from "@/core/infrastructure/auth/PasswordHasherImpl";
import { SessionServiceImpl } from "@/core/infrastructure/auth/SessionServiceImpl";
import { SalesChannelAImpl } from "@/core/infrastructure/sales/SalesChannelAImpl";
import { SalesChannelBImpl } from "@/core/infrastructure/sales/SalesChannelBImpl";

import { ListProductsUseCase } from "@/core/application/list-products-use-case";
import { SubmitOrderUseCase } from "@/core/application/submit-order-use-case";
import { LoginUseCase } from "@/core/application/login-use-case";
import { GetCurrentUserUseCase } from "@/core/application/get-current-user-use-case";
import { LogoutUseCase } from "@/core/application/logout-use-case";

import { CreateProductUseCase } from "@/core/application/create-product-use-case";
import { UpdateProductRarityUseCase } from "@/core/application/update-product-rarity-use-case";

// --- Repositorios e infraestructura ---
const productRepository = new ProductRepositoryImpl();
const userRepository = new UserRepositoryImpl();
const passwordHasher = new PasswordHasherImpl();
export const sessionService = new SessionServiceImpl();

const salesChannels = [new SalesChannelAImpl(), new SalesChannelBImpl()];

// --- Casos de uso exportados ---
export const listProductsUseCase = new ListProductsUseCase(productRepository);
export const submitOrderUseCase = new SubmitOrderUseCase(salesChannels);
export const loginUseCase = new LoginUseCase(userRepository, passwordHasher);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);
export const logoutUseCase = new LogoutUseCase();

export const createProductUseCase = new CreateProductUseCase(productRepository);
export const updateProductRarityUseCase = new UpdateProductRarityUseCase(productRepository);