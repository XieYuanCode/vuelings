import { DOMWrapper, mount } from "@vue/test-utils";
import component from "./02_RawHTML.vue"
import { test, expect } from "vitest";

test("Raw HTML", () => {
  const wrapper = mount(component)

  const span = wrapper.get('#raw_html')
  expect(span.text()).toEqual("HELLO WORLD!")

  // make sure element p with id "raw_html_p" is exist
  expect(() => {
    wrapper.get('#raw_html_p')
  }).not.toThrowError()

  // Make sure the color of the p element is red to match the definition of the string: raw_htmlString
  expect((wrapper.get('#raw_html_p') as Omit<DOMWrapper<HTMLElement>, "exists">).element.style.color).toBe('red')
})