import { DOMWrapper, mount } from "@vue/test-utils";
import RefComponent from "./01_Ref.vue"
import { test, expect, describe } from "vitest";

test("Ref", async () => {
  const wrapper = mount(RefComponent)

  const button = wrapper.get('#d_r_s_btn') as Omit<DOMWrapper<HTMLButtonElement>, "exists">
  const span = wrapper.get('#d_r_s_s')

  button.element.click()

  // You don't need to understand the functionality of this line of code for now
  // Or you can find a specific introduction in the document below
  // https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing
  await wrapper.vm.$nextTick()

  expect(span.text()).toBe("count is : 2")
})
