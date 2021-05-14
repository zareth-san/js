/**
 * Given an array of pairs of exchange pricings between different cryptocurrencies, write a function
 * `findBestPath` which finds the best path to trade between 2 assets.
 *
 * We represent pairs of assets as an Object with the following properties:
 * const pairs = [
 *   {
 *     "left": "BTC",
 *     "right": "USD",
 *     "bid": 65000,
 *     "ask": 65010
 *   },
 *
 *   {
 *     "left": "ETH",
 *     "right": "BTC",
 *     "bid": 0.04673,
 *     "ask": 0.04680
 *   },
 *
 *   {
 *     "left": "ETH",
 *     "right": "USD",
 *     "bid": 2500,
 *     "ask": 2505
 *   }
 * ]
 *
 * In the example array above, what would be the best way to trade if you owned USD, and wanted BTC?
 *
 * One way is to simply use the BTC-USD ask price, and for $1 you would get 1 / 65010 = 1.538e-5  BTC.
 * But another path would be ETH-USD -> ETH-BTC -> BTC-USD, where $1 would get 1 / 2505 = 3.992e-4 ETH, and
 * with that ETH you can use the ETH-BTC ticker to get 3.992e-4 * 0.04673 = 1.865e-5 BTC, which
 * is more than the simple BTC-USD path, so ETH-USD -> ETH-BTC -> BTC-USD represents the best path between USD and BTC.
 * `findBestPath` should return:
 *   [
 *     {
 *       "left": "ETH",
 *       "right": "USD"
 *     },
 *     {
 *       "left": "ETH",
 *       "right": "BTC"
 *     },
 *     {
 *       "left": "BTC",
 *       "right": "USD"
 *     },
 *   ]
 */

/**
 * Given a currency symbol for a cryptocurrency you own (e.g. USD), and a currency symbol
 * for a cryptocurrency you want to own (e.g. BTC) return an array of ticker symbol pairs
 * representing the most lucrative trading path, using the given adjacency and rates data
 * @param {String} ownedCurrency
 * @param {String} desiredCurrency
 * @param {Object} adjacency
 * @param {Object} rates
 * @returns {Array[String]} array of ticker symbols representing the most lucrative trading path
 */
const findBestPath = (ownedCurrency, desiredCurrency, adjacency, rates) => {
  // Implement me!
  return [
    {
      left: "FOO",
      right: "BAR",
    }
  ]
}

// creates an adjacency matrix to store whether or not a ticker exists
// for 2 components, and a rates matrix to store the bid and ask prices
// for the tickers
const setup = (pairs, adjacency, rates) => {
  // build the adjacency matrix
  for (let pair of pairs) {
    const { left, right } = pair
    if (adjacency[left] == null) {
      adjacency[left] = {}
    }
    if (adjacency[right] == null) {
      adjacency[right] = {}
    }
    adjacency[left][right] = true
    adjacency[right][left] = true
  }

  // build the rates matrix
  for (let pair of pairs) {
    const { left, right, bid, ask } = pair
    if (rates[left] == null) {
      rates[left] = {}
    }
    if (rates[right] == null) {
      rates[right] = {}
    }
    rates[left][right] = {
      bid,
      ask,
    }
    rates[right][left] = {
      bid,
      ask,
    }
  }
}

// Given a left and right components of a price ticker (e.g. BTC-USD) return
// the ask.
// It doesn't matter which order you pass in the currency symbols.
// Returns null if there is no ticker for the given components
const getAsk = (left, right, adjacency, rates) => {
  if (adjacency[right][left] == null && adjacency[left][right] == null) {
    return null
  }

  // try both orderings of the currency symbols so it doesn't matter which they pass in left or right
  return (rates[right][left] || rates[left][right]).ask
}

// Given a left and right components of a price ticker (e.g. BTC-USD) return
// the bid
// It doesn't matter which order you pass in the currency symbols.
// Returns null if there is no ticker for the given components
const getBid = (left, right, adjacency, rates) => {
    if (adjacency[right][left] == null && adjacency[left][right] == null) {
    return null
  }

  // try both orderings of the currency symbols so it doesn't matter which they pass in left or right
  return (rates[right][left] || rates[left][right]).bid
}

const main = () => {

  const ownedCurrency = "USD"
  const desiredCurrency = "BTC"
  const pairs = [
    {
      "left": "BTC",
      "right": "USD",
      "bid": 65000,
      "ask": 65010
    },
    {
      "left": "ETH",
      "right": "BTC",
      "bid": 0.04673,
      "ask": 0.04680
    },
    {
      "left": "ETH",
      "right": "USD",
      "bid": 2500,
      "ask": 2505
    }
  ]

  const adjacency = {}
  const rates = {}

  setup(pairs, adjacency, rates)

  console.log(findBestPath(ownedCurrency, desiredCurrency, adjacency, rates))
}

if (require.main === module) {
  main();
}
