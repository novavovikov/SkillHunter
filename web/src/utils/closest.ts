export const getClosestNode = (elem: any, node: Node | null) => {
  if (!elem || !node) {
    return null
  }

  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem === node) {
      return elem
    }
  }

  return null
}
