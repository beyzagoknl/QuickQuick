<template>
  <div id="HomePage">
    <div class="px-4 md:w-3/4 lg:w-2/3 mx-auto text-center">
      <h1
        class="text-4xl sm:text-5xl sm:text-5xl md:text-5xl leading-tight text-center text-gray-100 mb-3"
      >
        <b>Quick Quick</b>
      </h1>
    
      <p class="py-4 text-xl text-center text-gray-300">
        Are you the fast in the “fast and the furious?” How many words can you type per minute? Write the highlighted word and press the spacebar. Prove your speed to everyone!
      </p>
    </div>
    <div class="mt-6"></div>
    <div class="flex justify-center gap-4">
      <router-link
        class="w-40 mr-1 py-2 px-4 bg-[#008000] text-center text-white font-semibold text-2xl rounded-lg shadow-md hover:bg-[#008666] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 cursor-pointer"
        to="login"
      >
        Login
      </router-link>
      <router-link
        class="w-40 mr-1 py-2 px-4 bg-[#B22222] text-center text-white font-semibold text-2xl rounded-lg shadow-md hover:bg-[#B33222] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 cursor-pointer"
        to="register"
      >
        Register
      </router-link>
    </div>
  </div>
  <div id="videoDarkOverlay"></div>
  <video autoplay muted loop id="myVideo">
    <source src="../../public/background.mp4" type="video/mp4" />
  </video>
</template>

<style scoped>
#HomePage {
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
 
}
#myVideo {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -2;
}
#videoDarkOverlay {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.65);
}
</style>