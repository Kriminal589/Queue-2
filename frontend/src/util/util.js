import { serverRequest } from "../classes/serverReq";

export const applyInvite = (href, id) => {};

export const closeModal = () => {
  document.getElementById("modal").classList.remove("visible");
};

export const openModal = () => {
  document.getElementById("modal").classList.add("visible");
};

export const getStateModal = () => {
  return document.getElementById("modal").classList.contains("visible");
};
