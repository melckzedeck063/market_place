import React from 'react'

export default function TableComponent() {
  return (
    <div>

<div class="rounded-lg border bg-white">
  <div class="overflow-x-auto rounded-t-lg">
    <div className="text-2xl font-bold ml-6  mt-4 mb-6">Loan History</div>
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm px-8">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Name</th>
          <th class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Date of Birth</th>
          <th class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Role</th>
          <th class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Salary</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">John Doe</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">24/05/1995</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">Web Developer</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">$120,000</td>
        </tr>

        <tr>
          <td class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Jane Doe</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">04/11/1980</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">Web Designer</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">$100,000</td>
        </tr>

        <tr>
          <td class="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Gary Barlow</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">24/05/1995</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">Singer</td>
          <td class="px-4 py-2 whitespace-nowrap text-gray-700">$20,000</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
    <ol class="flex justify-end gap-1 text-xs font-medium">
      <li>
        <a
          href="#"
          class="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span class="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>

      <li>
        <a
          href="#"
          class="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          1
        </a>
      </li>

      <li
        class="block size-8 rounded-sm border-blue-600 bg-blue-600 text-center leading-8 text-white"
      >
        2
      </li>

      <li>
        <a
          href="#"
          class="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          3
        </a>
      </li>

      <li>
        <a
          href="#"
          class="block size-8 rounded-sm border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          4
        </a>
      </li>

      <li>
        <a
          href="#"
          class="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </li>
    </ol>
  </div>
</div>
    </div>
  )
}
