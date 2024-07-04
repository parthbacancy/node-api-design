import prisma from "../db";

export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, currentUpdates) => {
    return [...allUpdates, ...currentUpdates.updates];
  }, []);

  res.json({
    data: updates,
  });
};

export const getUpdateById = async (req, res) => {
  const id = req.params.id;

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    // User doesn't have access to Product
    res.json({
      messsage: "nope",
    });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, currentUpdates) => {
    return [...allUpdates, ...currentUpdates.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "nope" });
  }

  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updateUpdate });
};

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates: any, currentUpdates) => {
    return [...allUpdates, ...currentUpdates.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    return res.json({ message: "nope" });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
