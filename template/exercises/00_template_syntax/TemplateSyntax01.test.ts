import { mount } from "@vue/test-utils";
import component from "./TemplateSyntax01.vue"
import { test, expect } from "vitest";

test("Template Syntax 01", () => {
  const wrapper = mount(component)

  const span = wrapper.get('#template_syntax_01')

  expect(span.text()).toBe("HELLO WORLD!")
})