import { Invoice } from "@models/invoice/invoice";
import { User } from "@models/user";
import { Request ,Response } from 'express';

// fetch Invoices
export const getInvoices = async (req: Request, res: Response) => {
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
export const getInvoice = async (req, res) => {
  const id = req.params.id;
  const invoice = await Invoice.findByPk(id, {
    include: [{
      model: User,
      required: true
    }]
  });

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
export const addInvoice = async (req, res) => {
  const userId = req.body.id;

  const totalNoTax = req.body.totalNoTax;
  const total = req.body.total;
  const status = 0;

  const invoice = Invoice.create({
    totalNoTax,
    total,
    status,
    userId,
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
export const deleteInvoice = async (req, res) => {
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
export const updateInvoice = async (req, res) => {
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
  const status = req.body.status;

  const updatedInvoice = await Invoice.update(
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
