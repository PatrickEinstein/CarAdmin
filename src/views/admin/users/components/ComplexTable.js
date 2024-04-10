import React, { useMemo } from "react";
import {
  Flex,
  Table,
  Progress,
  Icon,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  useColorModeValue,
  IconButton,
  Button,
} from "@chakra-ui/react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ReactPaginate from "react-paginate";

export default function ColumnsTable(props) {
  const { tableHeading, columnsData, tableData } = props;

  const columns = useMemo(() => {
    return columnsData.map((column) => ({
      Header: column.header,
      accessor: column.key,
      cellType: column.cellType,
    }));
  }, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex px="25px" justify="space-between" mb="10px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {tableHeading}
        </Text>
        <Menu />
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => {
                  let data = cell.value;
                  const column = cell.column;
                  if (column.cellType === "text") {
                    data = (
                      <Text color={textColor} fontSize="sm" fontWeight="700">
                        {cell.value}
                      </Text>
                    );
                  } else if (typeof cell.value === "boolean") {
                    data = (
                      <Flex align="center">
                        <Icon
                          w="24px"
                          h="24px"
                          me="5px"
                          color={cell.value ? "green.500" : "red.500"}
                          as={cell.value ? MdCheckCircle : MdCancel}
                        />
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value ? "Active" : "Inactive"}
                        </Text>
                      </Flex>
                    );
                  } else if (column.cellType === "progress") {
                    data = (
                      <Flex align="center">
                        <Progress
                          variant="table"
                          colorScheme="brandScheme"
                          h="8px"
                          w="108px"
                          value={cell.value}
                        />
                      </Flex>
                    );
                  }
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={cellIndex}
                      fontSize={{ sm: "14px" }}
                      maxH="30px !important"
                      py="8px"
                      minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      borderColor="transparent"
                    >
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/* Pagination */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mr="25px" // Adjust margin to position it properly
        mb="15px" // Adjust margin to position it properly
      >
        <Button
          size="sm"
          colorScheme="blue"
          mr="2"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="sm"
          colorScheme="blue"
          mr="2"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <ChevronRightIcon />
        </Button>
        <Text color={textColor} fontSize="sm" mr="2">
          Page{" "}
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </Text>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => gotoPage(0)}
          disabled={state.pageIndex === 0}
        >
          {"<<"}
        </Button>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => gotoPage(state.pageCount - 1)}
          disabled={state.pageIndex === state.pageCount - 1}
        >
          {">>"}
        </Button>
      </Box>
    </Card>
  );
}
