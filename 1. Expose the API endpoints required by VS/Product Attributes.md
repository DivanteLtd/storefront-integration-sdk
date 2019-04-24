# API docs for Vue Storefront

To add new attribute to your custom API you need to know how you're going to use it. 

The most common usages are:
- Simply show attribute on product page
- Use attribute on product listing (e.g. star number on product list)
- Use attribute to filter products

@FIXME: Define steps needed to implement each of the steps in later commit 
- simple (null/string/integer)
- filterable (which are returned as ID of the attributes/index attribute options) - product value can there be null 
or must be an integer number representing `value` from attribute options (will be later mapped to attribute label 
from within vue-storefront), should be null if not set
- list how product attributes are overriden (child overrides parent) with Object.assign in vue-storefront
- multiselect values should be returned as:
{
            "attribute_code": "material",
            "value": "156,150,154"
}, so API can parse them correctly (@FIXME: code reference needed, this is probably not the case with */index 
endpoints )