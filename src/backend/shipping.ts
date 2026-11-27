/**
 * Shipping: how an order gets a courier and tracking number. Today it is manual (you type the
 * tracking number in /admin → Orders). Adding Shiprocket later means writing one provider here
 * and calling it from a server route when an order is marked "packed"; screens don't change.
 */
export type Shipment = { courier: string; tracking: string; trackingUrl?: string };

export type ShippingProvider = {
  id: string;
  label: string;
  /** Books a pickup for an order. Must run on the server (it uses a secret API key). */
  createShipment: (order: { number: string; pincode: string; weightGrams: number }) => Promise<Shipment | null>;
};

/** Manual: you book the courier yourself and paste the tracking number in /admin. */
export const manualShipping: ShippingProvider = {
  id: "manual",
  label: "Manual (tracking number entered in /admin)",
  createShipment: async () => null,
};

// Later: export const shiprocket: ShippingProvider = { id: "shiprocket", label: "Shiprocket", createShipment: … }

export const shippingProvider: ShippingProvider = manualShipping;
