<template>
    <div id="home">
      <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="container px-5 py-5 mx-auto flex items-center md:flex-row flex-col">
          <div class="flex flex-col md:pr-10 md:mb-0 mb-6 pr-0 w-full md:w-auto md:text-left text-center">
            <h2 class="text-xs dark:text-indigo-400 tracking-widest font-medium title-font mb-1">{{dashboardData.nickname}}</h2>
            <h1 class="md:text-l text-xl font-medium title-font dark:text-white">{{dashboardData.did}}</h1>
          </div>
          <div class="flex md:ml-auto md:mr-0 mx-auto items-center flex-shrink-0 space-x-4">
            <button class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-700 dark:text-gray-500 mb-1">Proof Credits</span>
                <span class="title-font font-medium">{{dashboardData.proofCredits}}</span>
              </span>
            </button>
            <button @click="$router.push({name:'Wallet'})" class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-700 dark:text-gray-500 mb-1">Balance</span>
                <span class="title-font font-medium">RBX {{dashboardData.balance}}</span>
              </span>
            </button>
            <button @click="$router.push({name:'Transactions'})" class="bg-red-200 dark:bg-gray-800 inline-flex py-3 px-5 rounded-lg items-center hover:bg-red-700 dark:hover:bg-gray-700 hover:bg-opacity-50 focus:outline-none">
              <span class="ml-4 flex items-start flex-col leading-none">
                <span class="text-xs text-blue-700 dark:text-gray-500 mb-1">Transactions</span>
                <span class="title-font font-medium">{{dashboardData.totalTxn}}</span>
              </span>
            </button>
          </div>
        </div>
      </section>
      <section class="dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="container px-0 py-10 mx-auto flex flex-wrap">
          <div class="flex flex-wrap w-full">
            <div class="lg:w-2/3 md:w-2/3 md:pr-10 md:py-4">

              <div v-for="t in txns" :key="t" class="flex relative">
                <div class="flex-shrink-0 w-10 h-10 rounded-full dark:tbg-indigo-500 bg-red-500 inline-flex items-center justify-center dark:text-white relative z-10">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div class="flex-grow pl-4">
                  <h2 class="font-medium title-font text-l md:text-l dark:text-white mb-1 tracking-wider">{{t.txn}}</h2>
                  <p class="leading-relaxed">on {{t.Date}}</p>
                </div>
              </div>

            </div>
            <div class="lg:w-1/3 md:w-1/3 bg-red-200 dark:bg-gray-800 bg-opacity-50 rounded-lg p-2 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
              <h2 class="dark:text-white text-lg font-medium title-font mb-5">New Transaction</h2>
              <!-- <div class="relative mb-4">
                <input type="radio" id="Nickname" value="Nickname" v-model="picked">
                <label class="pr-2 leading-7 text-l dark:text-gray-400" for="Nickname"> Nickname</label>
                <input type="radio" id="DID" value="DID" v-model="picked">
                <label class="leading-7 text-l dark:text-gray-400" for="DID"> DID</label>
              </div> -->
              <div class="relative mb-4">
                <!-- <label for="full-name" class="leading-7 text-l dark:text-gray-400">{{picked}}</label> -->
                <label for="full-name" class="leading-7 text-l dark:text-gray-400">Reciver DID / Nickname</label>
                <textarea v-model="newTxn.receiver" spellcheck="false" type="text" id="full-name" name="full-name" class="w-full bg-white dark:bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
              </div>
              <div class="relative mb-4">
                <label for="email" class="leading-7 text-l dark:text-gray-400">Amount</label><br>
                <span class="pr-2 title-font font-medium">RBX</span>
                <input v-model="newTxn.amount" type="email" id="email" name="email" class="w-1/3 bg-white dark:bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
              <div class="relative mb-4">
                <label for="email" class="leading-7 text-l dark:text-gray-400">Comments</label>
                <!-- <select v-model="newTxn.comment" class="w-full bg-white dark:bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-red-500 dark:border-indigo-500 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <option disabled value="">Please select one</option>
                  <option>Education</option>
                  <option>Token Transfer</option>
                  <option>Ransome</option>
                </select> -->
                <vue-simple-suggest
                  v-model="newTxn.comment"
                  :list="simpleSuggestionList"
                  :filter-by-query="false">
                </vue-simple-suggest>
              </div>
              <button :disabled='dashboardData.balance==0' @click="initiateTransaction()" class="dark:text-white border-0 py-2 px-8 focus:outline-none rounded text-lg" v-bind:class="{'bg-gray-300': dashboardData.balance==0, 'dark:bg-indigo-500 bg-red-500 hover:bg-red-600 dark:hover:bg-indigo-600': dashboardData.balance!=0}">Initiate Transaction</button>
              <p v-if="dashboardData.balance!=0" class="text-xs mt-3">Transaction will take approx 1 min to complete.</p>
              <p v-if="dashboardData.balance==0" class="text-xs mt-3">You dont have sufficient balance for transaction.</p>
            </div>
          </div>
        </div>
      </section>
      <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              {{transactionResponse}}
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'
import 'vue-simple-suggest/dist/styles.css'
import axios from 'axios'

export default {
    name: 'DashboardHome',
    components: {
      VueSimpleSuggest
    },
    data() {
        return {
          transactionResponse: "Transaction Error",
          showModal: false,
          dashboardData: {},
          quorum: [],
          txns: [],
          did:"",
          picked: "",

          newTxn: {
            receiver: "",
            tokenCount: 1,
            comment: "",
            type: 1
          }
        }
    },
    methods: {

      toggleModal: function(){

        this.showModal = !this.showModal;
      },

      simpleSuggestionList() {
        return [
          'Gift',
          'Token Transfer',
          'Education'
        ]
      },

      initiateTransaction() {

        this.$loading(true)

        axios.post('http://localhost:1898/initiateTransaction', {
          "receiver": this.newTxn.receiver,
          "tokenCount": this.newTxn.tokenCount,
          "comment": this.newTxn.comment,
          "type": this.newTxn.type,
          // "Quorum": this.quorum
        })
        .then((response) => {
          this.$loading(false)
          this.newTxn.receiver= ""
          this.transactionResponse = response.data.data.response.message
          this.newTxn.comment= ""
          this.newTxn.tokenCount= 1
          this.toggleModal()
            
        })
        .catch(function (error) {
          console.log(error);
          this.$loading(false)
          this.newTxn.receiver= ""
          this.newTxn.comment= ""
          this.newTxn.tokenCount= 1
          this.transactionResponse = "Error, Try again!"
          this.toggleModal()
        });
      },

      transactions() {
        axios.post('http://localhost:1898/getTxnByCount', {
          "txnCount": 5
        })
        .then((response) => {

          this.txns = response.data.data.response;
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      dashboard() {
        axios.get('http://localhost:1898/getDashboard')
        .then((response) => {
          this.dashboardData = response.data.data.response;
        })
        .catch(function (error) {
          console.log(error);
        });
      }

    },
    mounted: function () {
      window.setInterval(() => {
        this.dashboard()
        this.transactions()
      }, 3000)
    },

    beforeMount(){
      this.$loading(false)
      this.dashboard()
      this.transactions()
 }
}
</script>
<style scoped>
input.disable-input {
  background-color: gray;
}
</style>