### day01任务
			1. 电脑安装mongonDB数据库(注意：需要配置环境变量)
			2. 安装studio3T连接数据库并导入数据
			3. 初始化一个脚手架
			4. 引入antd，配置样式按需引入、自定义主题
			5. 引入路由，搭建login和admin一级路由
			6. 引入antd中Form组件，实现登录表单
			7. 用户的声明式验证
			8. 密码的自定义验证

### day02任务
			1.使用postman测试接口(地址、参数、方式)
			2.配置代理解决跨域问题
			3.使用了axios的请求拦截器，处理post请求参数json编码的问题。
			4.使用了axios的响应拦截器，统一处理请求的错误。
			5.提取文件：
					5.1 提取ajax/ajax.js包装原生axios
					5.2 提取:ajax/index.js统一管理请求
			6.使用Nprogress制作进度条效果（假）

### day03任务
			redux上

### day04任务
			redux下

### day05任务
			1.Login组件，弹窗提示登录是否成功，用到：message组件
			2.搭建redux环境(选择性练习)
			3.登录成功，保存用户信息到redux中，随后跳转到Admin
			4.Admin组件中，要读取redux中保存的用户信息（注意对象结构）
			5.登录成功，将用户信息保存到local中，redux初始化用户信息的时候，从local中读取
			6.对Login组件和Admin组件进行权限验证(没有登录，只能看login；已经登录，不能看login)
				备注：render中做校验，render中的跳转要用Redirect
			7.Admin组件的整体布局
			8.Header组件的静态布局
			9.screenfull全屏库的使用(F11全屏带来的问题)
			10.Header组件和redux的交互
			11.antd中confirm组件的使用

### day06任务
			1.使用dayjs格式化时间
			2.jsopn请求天气信息（百度接口）
			3.antd中的Menu组件结构--静态分析
			4.根据菜单配置文件，自动生成菜单
			5.刷新页面自动展开、选中菜单
			6.解决登录后不自动自动选中首页的问题

