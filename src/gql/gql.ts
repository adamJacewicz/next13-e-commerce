/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CategoriesGetByCategorySlugDocument,
    "query CollectionsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}": types.CollectionsGetByCollectionSlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n    ...ProductVariants\n  }\n}": types.ProductGetByIdDocument,
    "fragment ProductListItem on Product {\n  price\n  name\n  description\n  id\n  images {\n    url\n  }\n  categories {\n    name\n    id\n  }\n}": types.ProductListItemFragmentDoc,
    "fragment ProductVariants on Product {\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n      color\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n  }\n}": types.ProductVariantsFragmentDoc,
    "query ProductsGetByCategorySlug($slug: String!, $skip: Int, $first: Int) {\n  products(first: $first, where: {categories_some: {slug: $slug}}, skip: $skip) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCategorySlugDocument,
    "query ProductsGetByCollectionSlug($slug: String!, $skip: Int, $first: Int) {\n  products(first: $first, where: {collections_some: {slug: $slug}}, skip: $skip) {\n    ...ProductListItem\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetByCollectionSlugDocument,
    "query ProductsGetList($skip: Int, $first: Int) {\n  products(skip: $skip, first: $first) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListDocument,
    "query ProductsGetListBySearchQuery($skip: Int, $first: Int, $query: String) {\n  products(where: {_search: $query}, skip: $skip, first: $first) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}": types.ProductsGetListBySearchQueryDocument,
    "query ProductsGetRecommendationList {\n  products(\n    orderBy: publishedAt_ASC\n    where: {reviews_some: {rating_gte: 4}}\n    first: 4\n  ) {\n    ...ProductListItem\n  }\n}": types.ProductsGetRecommendationListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CategoriesGetByCategorySlug($slug: String!) {\n  categories(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CategoriesGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CollectionsGetByCollectionSlug($slug: String!) {\n  collections(where: {slug: $slug}) {\n    id\n    name\n    slug\n  }\n}"): typeof import('./graphql').CollectionsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    ...ProductListItem\n    ...ProductVariants\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductListItem on Product {\n  price\n  name\n  description\n  id\n  images {\n    url\n  }\n  categories {\n    name\n    id\n  }\n}"): typeof import('./graphql').ProductListItemFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProductVariants on Product {\n  variants {\n    ... on ProductColorVariant {\n      id\n      name\n      color\n    }\n    ... on ProductSizeColorVariant {\n      id\n      name\n      color\n      size\n    }\n    ... on ProductSizeVariant {\n      id\n      name\n      size\n    }\n  }\n}"): typeof import('./graphql').ProductVariantsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCategorySlug($slug: String!, $skip: Int, $first: Int) {\n  products(first: $first, where: {categories_some: {slug: $slug}}, skip: $skip) {\n    ...ProductListItem\n  }\n  productsConnection(where: {categories_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCategorySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetByCollectionSlug($slug: String!, $skip: Int, $first: Int) {\n  products(first: $first, where: {collections_some: {slug: $slug}}, skip: $skip) {\n    ...ProductListItem\n  }\n  productsConnection(where: {collections_some: {slug: $slug}}) {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetByCollectionSlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetList($skip: Int, $first: Int) {\n  products(skip: $skip, first: $first) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetListBySearchQuery($skip: Int, $first: Int, $query: String) {\n  products(where: {_search: $query}, skip: $skip, first: $first) {\n    ...ProductListItem\n  }\n  productsConnection {\n    aggregate {\n      count\n    }\n  }\n}"): typeof import('./graphql').ProductsGetListBySearchQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductsGetRecommendationList {\n  products(\n    orderBy: publishedAt_ASC\n    where: {reviews_some: {rating_gte: 4}}\n    first: 4\n  ) {\n    ...ProductListItem\n  }\n}"): typeof import('./graphql').ProductsGetRecommendationListDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
