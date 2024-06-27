"use client";
import { useState } from "react";
import React from "react";
import ShowModal from "./ShowedModal";
import Post from "../Post";

const Modal = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  return (
    <div>
      <div
        className=" w-[150px] max-sm:w-auto -translate-x-52 max-sm:translate-x-full  max-sm:h-auto max-md:-translate-x-52 max-md:w-auto min-md:h-auto md:mt-[13%]"
        onClick={() => setModalState(true)}
      >
        <Post />
      </div>
      <div>{modalState && <ShowModal setModalState={setModalState} />}</div>
    </div>
  );
};

export default Modal;
