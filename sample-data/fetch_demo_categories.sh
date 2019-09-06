# This command requires "jq" -> https://stedolan.github.io/jq/
if ! [ -x "$(command -v jq)" ]; then
  echo 'Error: jq is not installed. Please download it from https://stedolan.github.io/jq/' >&2
  exit 1
fi

curl -sS  "https://demo.storefrontcloud.io/api/catalog/vue_storefront_catalog/category/_search?size=2500&from=0" | jq ".hits.hits[]._source | { id, parent_id, name, url_key, path, url_path, is_active, position, level, product_count, children_data: [ .children_data[] | { id, children_data: [ .children_data[] | { id, children_data: [ .children_data[] | { id, children_data: [ .children_data[] | { id } ] } ] } ] } ] }" | jq -s -M \ > categories.json

echo "Categories dumped into 'categories.json'"