import frappe
import json

@frappe.whitelist()
def get_price_list_rate(item):
    item = json.loads(item)
    prices = frappe.db.get_all("Item Price", fields=["price_list_rate"], filters={"item_code": item.get("item_code"), "price_list": item.get("etpl_price_list"), "selling": 1}, order_by="valid_from desc")
    if prices:
        return prices[0]
    else:
        return {"price_list_rate": 0}
