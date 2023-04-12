/**
 * This function is used to generate the URL for the meta image endpoint. It receives an entity key (a journal entry slug or another unique identifier) instead of the whole meta config to avoid abuse. With the entity key [from the endpoint] we can now retrieve its meta config accordingly.
 */
export function getMetaImageUrl(url: string, entityKey: string) {
  return new URL(`/meta-image/${entityKey}`, new URL(url).origin).href
}
