export function PageFooter() {
  return (
    <footer className="rounded-[1.5rem] border border-stone-200 bg-white/80 px-6 py-5 text-sm leading-7 text-stone-500 shadow-sm backdrop-blur">
      <p>当前版本使用内置静态数据，重点呈现节令浏览、阅读与筛选体验。</p>
      <p className="mt-2">
        后续如需扩展，可在保持当前信息架构的前提下接入 CMS、详情页或更丰富的配图内容。
      </p>
    </footer>
  )
}
