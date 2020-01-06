interface Cont<R> {
  fail?: (_: any) => void
  success?: (_: R) => void
}

interface Suspendable<O> {
  (option: O): any
}

let suspend = <O extends Cont<any>>(src: Suspendable<O>) => async (opt: Omit<O, "success" | "fail">) => await new Promise<Parameters<Exclude<O["success"], undefined>>[0]>((resolve, _) => src({
  ...opt,
  success: right => resolve(right),
  fail: (_) => resolve(undefined)
} as O))

export let login = () => suspend(wx.login)({})
export let getWeRunData = () => suspend(wx.getWeRunData)({})
export let checkSession = () => suspend(wx.checkSession)({})
export let openSetting = () => suspend(wx.openSetting)({})
export let getUserInfo = () => suspend(wx.getUserInfo)({})
export let getBatteryInfo = () => suspend(wx.getBatteryInfo)({})
export let getLocation = () => suspend(wx.getLocation)({})
export let getSetting = () => suspend(wx.getSetting)({})

export let request = suspend(wx.request)
export let authorize = suspend(wx.authorize)
