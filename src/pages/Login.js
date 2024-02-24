export default function Login() {
  return (
    <section>
      <div>
        <h1 class="pb-4">Login</h1>
     
        <form class="mb-4">
          <div class="flex flex-col w-6/12">
            <label for="Username">Username</label>
            <input
              class="border-solid border-2 border-[black]"
              type="text"
              name="Username"
            />
          </div>
          <div class="flex flex-col w-6/12">
            <label for="password">Password</label>
            <input
              class="border-solid border-2 border-[black]"
              type="text"
              name="password"
            />
          </div>
          <button
            class="mt-4 font-[bold] w-full max-w-[15rem] text-xl transition-all duration-300 ease-[ease] px-6 py-3 border-2 border-solid border-[black]"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div class="flex">
          <h4 class="mr-[0.25rem]">Don't have an account?</h4>
          <a
            class="hover:text-blue-700 transition-all duration-300 ease-[ease]"
            href="/signup"
          >
            Sign up!
          </a>
        </div>
      </div>
    </section>
  );
}
