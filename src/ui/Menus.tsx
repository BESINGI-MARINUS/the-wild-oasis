import { EllipsisVerticalIcon } from "@heroicons/react/16/solid";
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenusContextType {
  openId: string;
  open: (id: string) => void;
  close: () => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
}

const MenusContext = createContext<MenusContextType | undefined>(undefined);

function Menus({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Menus.Toggle must be used within Menus");

  const { openId, close, open, setPosition } = context;

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    if (openId === "" || id !== openId) open(id);
    else close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <EllipsisVerticalIcon />
    </StyledToggle>
  );
}

function List({ id, children }: { id: string; children: React.ReactNode }) {
  const context = useContext(MenusContext);

  if (!context) throw new Error("Menus.List must be used within Menus");

  const { openId, position, close } = context;
  const { ref } = useOutsideClick<HTMLUListElement>(close);

  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

interface ButtonProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, icon, onClick }: ButtonProps) {
  const context = useContext(MenusContext);
  if (!context) throw new Error("Menus context must be used within Menus");

  const { close } = context;
  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
