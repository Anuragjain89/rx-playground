export function getItems(title) {
  console.log(`Querying ${title}`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([title, 'Another title', `yet another ${Math.random()}`]);
    }, 500 + (Math.random() * 1000));
  })
}
