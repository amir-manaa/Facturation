const InvoiceItem = require("../../models/invoice/invoice-item");

// fetch Invoice items
exports.getInvoiceItems = async (req, res) => {
  const invoiceItems = await InvoiceItem.findAll();
  res.status(200).json({
    status: "success",
    length: invoiceItems.length,
    data: {
      invoiceItems,
    },
  });
};

// fetch invoice item by id
exports.getInvoiceItem = async (req, res) => {
  const id = req.params.id;
  const invoiceItem = await InvoiceItem.findByPk(id);

  if (!invoiceItem) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: {
        invoiceItem,
      },
    });
  }
};

// Add new invoice item
exports.addInvoiceItem = async (req, res) => {
  const invoiceId = req.body.id;

  const quantity = req.body.quantity;
  const description = req.body.description;
  const cost = req.body.cost;

  const invoiceItem = InvoiceItem.create({
    quantity: quantity,
    description: description,
    cost: cost,
    invoiceId: invoiceId,
  });

  if (invoiceItem) {
    return res.status(200).json({
      status: "success",
      data: {
        invoiceItem,
      },
    });
  } else {
    return res.status(500).json({
      status: "fail",
    });
  }
};

//delete invoice item
exports.deleteInvoiceItem = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const invoiceItem = await InvoiceItem.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      InvoiceItem,
    },
  });
};

// update invoice item
exports.updateInvoiceItem = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const invoice = await InvoiceItem.findByPk(id);
  if (!invoice) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const quantity = req.body.quantity;
  const description = req.body.description;
  const cost = req.body.cost;

  const updatedInvoice = await InvoiceItem.update(
    {
      quantity: quantity,
      description: description,
      cost: cost,
    },
    {
      where: { id: id },
    }
  );

  if (updatedInvoice) {
    return req.status(200).json({
      status: "success",
      data: {
        updatedInvoice,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
    });
  }
};
