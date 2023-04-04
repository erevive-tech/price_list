
// Client Script

frappe.ui.form.on('Sales Invoice', {
	setup(frm) {
		frm.set_query("etpl_price_list", "items", function() {
            return {
                filters: {
                    "selling": 1
                }
            }
        })
	}
});


frappe.ui.form.on('Sales Invoice Item', {
	refresh(frm) {
		// your code here
	},

    item_code(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
        frappe.call({
            method: "price_list.api.get_price_list_rate",
            args: {
                item: row
            },
            callback: function(r) {
                if (!r.exc) {
                    frappe.model.set_value(row.doctype, row.name, "price_list_rate", r.message.price_list_rate)
                }
            }
        })
    },

    etpl_price_list(frm, cdt, cdn) {
        let row = frappe.get_doc(cdt, cdn);
        frappe.call({
            method: "price_list.api.get_price_list_rate",
            args: {
                item: row
            },
            callback: function(r) {
                if (!r.exc) {
                    frappe.model.set_value(row.doctype, row.name, "price_list_rate", r.message.price_list_rate)
                }
            }
        })
    }
});