export default function ResultsTable ({ results }) {
	return (
		<table>
			<thead>
				<tr>
					<th> S No. </th>
					<th> Name </th>
					<th> Username </th>
					<th> Points </th>
				</tr>
			</thead>
			<tbody>
				{
					results.map(({ name, username, points }, index) => (
						<tr key={ username }>
							<td>{ index + 1 }</td>
							<td>{ name }</td>
							<td>{ username }</td>
							<td>{ points }</td>
						</tr>
					))
				}
			</tbody>
		</table>
	);
}
