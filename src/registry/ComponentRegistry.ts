import React from "react";
import { SDUINode } from "../types/sdui.types";

export type SDUIComponentType = React.ComponentType<{ node: SDUINode }>;

class ComponentRegistry {
  private registry = new Map<string, SDUIComponentType>();

  register(type: string, component: SDUIComponentType) {
    this.registry.set(type, component);
  }

  get(type: string): SDUIComponentType | undefined {
    return this.registry.get(type);
  }

  has(type: string): boolean {
    return this.registry.has(type);
  }
}

export const sduiComponentRegistry = new ComponentRegistry();
