import React, { Fragment } from "react";
import { Routes, Route } from 'react-router-dom';

const authMiddleware = ({ component: Component }) => {
	return <Component />
}

const isUndefined = (args) => {
	return typeof args === 'undefined';
}

const RRDJR = ({ routesList, authMiddleware: Component }) => {

	const RRDJR_nest = (item, path, secure = false) => {
		return item?.map((childi, index) => {
			return (
				<Fragment key={`${index}_${path}${childi.path}`}>
					{childi.component ? <Route index={childi.index ? true : undefined} path={childi.index ? undefined : `/${path}/${childi.path}`} element={<Component secure={isUndefined(childi.secure) ? secure : childi.secure} component={childi.component} />} /> : null}
					{childi.wrapper ? <Route path={`/${path}/${childi.path}`} element={<Component secure={isUndefined(childi.secure) ? secure : childi.secure} component={childi.wrapper} />}>
						{childi?.children?.length ? RRDJR_nest(childi.children, `${path}/${childi.path}`, isUndefined(childi.secure) ? secure : childi.secure) : null}
					</Route> : null}
					{childi.component && childi?.children?.length ? RRDJR_nest(childi.children, `${path}/${childi.path}`, isUndefined(childi.secure) ? secure : childi.secure) : null}
				</Fragment>
			)
		})
	}
	

	return (
		<Routes>
			{
				routesList.map((item, index) => {
					return (
						<Fragment key={index}>
							{item.component ? <Route path={item.path} element={<Component secure={item.secure} component={item.component} />} /> : null}
							{item.wrapper ? <Route path={item.path} element={<Component secure={item.secure} component={item.wrapper} />}>
								{item?.children?.length ? RRDJR_nest(item.children, item.path, item.secure) : null}
							</Route>  : null}
							{item.component && item?.children?.length ? RRDJR_nest(item.children, item.path, item.secure) : null}
						</Fragment>
					)
				})
			}
		</Routes>
	)
}

RRDJR.defaultProps = {
	routesList: [],
	authMiddleware: authMiddleware
}

export default RRDJR;