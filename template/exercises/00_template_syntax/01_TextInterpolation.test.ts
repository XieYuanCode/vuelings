import { mount } from "@vue/test-utils";
import component from "./01_TextInterpolation.vue"
import { test, expect } from "vitest";

test("Text Interpolation", () => {
  const wrapper = mount(component)

  const span = wrapper.get('#text_interpolation_span')

  expect(span.text()).toBe("HELLO WORLD!")
})