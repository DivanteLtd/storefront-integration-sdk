# This command requires "jq" -> https://stedolan.github.io/jq/
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed. Please download it from https://stedolan.github.io/jq/' >&2
  exit 1
fi

curl -sS  "https://demo.storefrontcloud.io/api/catalog/vue_storefront_catalog/attribute/_search?size=50&from=0&sort=&_source_include=attribute_code%2Cid%2Centity_type_id%2Coptions%2Cdefault_value%2Cis_user_defined%2Cfrontend_label%2Cattribute_id%2Cdefault_frontend_label%2Cis_visible_on_front%2Cis_visible%2Cis_comparable%2Ctier_prices%2Cfrontend_input&request=%7B%22query%22%3A%7B%22bool%22%3A%7B%22filter%22%3A%7B%22bool%22%3A%7B%22must%22%3A%5B%7B%22terms%22%3A%7B%22attribute_code%22%3A%5B%22pattern%22%2C%22eco_collection%22%2C%22new%22%2C%22climate%22%2C%22style_bottom%22%2C%22size%22%2C%22color%22%2C%22performance_fabric%22%2C%22sale%22%2C%22material%22%5D%7D%7D%2C%7B%22terms%22%3A%7B%22is_user_defined%22%3A%5Btrue%5D%7D%7D%2C%7B%22terms%22%3A%7B%22is_visible%22%3A%5Btrue%5D%7D%7D%5D%7D%7D%7D%7D%7D" | jq ".hits.hits[]._source | { id, is_user_defined, is_visible, frontend_input, attribute_code, default_value, options, default_frontend_label }" | jq -s -M \ > attributes.json

echo "Attributes dumped into 'attributes.json'"