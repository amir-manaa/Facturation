const Invoice = require("../../models/invoice/invoice");

// fetch Invoices
exports.getInvoices = async (req, res) => {
  const invoices = await Invoice.findAll();
  res.status(200).json({
    status: "success",
    length: invoices.length,
    data: {
      invoices,
    },
  });
};

// fetch invoice by id
exports.getInvoice = async (req, res) => {
  const id = req.params.id;
  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  }
};

// Add new invoice
exports.addInvoice = async (req, res) => {
  const customerId = req.body.id;

  const totalNoTax = req.body.totalNoTax;
  const total = req.body.total;
  const status = 0;

  const invoice = Invoice.create({
    totalNoTax: totalNoTax,
    total: total,
    status: status,
    customerId: customerId,
  });

  if (invoice) {
    return res.status(200).json({
      status: "success",
      data: {
        invoice,
      },
    });
  } else {
    return res.status(500).json({
      status: "fail",
    });
  }
};

//delete invoice
exports.deleteInvoice = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const invoice = await Invoice.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      invoice,
    },
  });
};

// update invoice
exports.updateInvoice = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const invoice = await Invoice.findByPk(id);
  if (!invoice) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const totalNoTax = req.body.totalNoTax;
  const total = req.body.total;
  const status = status;

  const updatedInvoice = await Customer.update(
    {
      totalNoTax: totalNoTax,
      total: total,
      status: status,
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
