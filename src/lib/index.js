import React, { useMemo, memo, Fragment } from "react";
import { Routes, Route } from 'react-router-dom';

// Memoize the authMiddleware function
const AuthMiddleware = memo(({ component: Component }) => {
	return <Component />;
});

// Function to render nested routes without wrapping them in a custom component
const renderNestedRoutes = (items, path, secure, Component) => {
	return items?.map((childi, index) => {
		const childPath = childi.index ? undefined : `${path}/${childi.path}`;
		const isSecure = childi?.secure ?? secure;

		return (
			<Fragment key={`${index}_${path}${childi.path}`}>
				{childi.component && (
					<Route
						index={!!childi.index}
						path={childPath}
						element={<Component secure={isSecure} component={childi.component} />}
					/>
				)}
				{childi.wrapper && (
					<Route
						path={`${path}/${childi.path}`}
						element={<Component secure={isSecure} component={childi.wrapper} />}
					>
						{childi?.children?.length ? (
							renderNestedRoutes(childi.children, `${path}/${childi.path}`, isSecure, Component)
						) : null}
					</Route>
				)}
				{childi.component && childi?.children?.length && (
					renderNestedRoutes(childi.children, `${path}/${childi.path}`, isSecure, Component)
				)}
			</Fragment>
		);
	});
};

const RRDJR = ({ routesList = [], authMiddleware: Component = AuthMiddleware }) => {
	// Memoize the routesList to prevent unnecessary recalculations on re-renders
	const memoizedRoutesList = useMemo(() => routesList, [routesList]);

	return (
		<Routes>
			{memoizedRoutesList.map((item, index) => {
				const isSecure = item.secure;

				return (
					<Fragment key={index}>
						{item.component && (
							<Route
								path={item.path}
								element={<Component secure={isSecure} component={item.component} />}
							/>
						)}
						{item.wrapper && (
							<Route path={item.path} element={<Component secure={isSecure} component={item.wrapper} />}>
								{item?.children?.length ? (
									renderNestedRoutes(item.children, item.path ? `/${item.path}` : item.path, isSecure, Component)
								) : null}
							</Route>
						)}
						{item.component && item?.children?.length && (
							renderNestedRoutes(item.children, item.path, isSecure, Component)
						)}
					</Fragment>
				);
			})}
		</Routes>
	);
};

export default memo(RRDJR);




