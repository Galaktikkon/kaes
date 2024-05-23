"use client";

import { useConfigContext } from "@/app/configProvider";
import {
  Button,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { IoStatsChartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import fetchUserStats from "@/src/Services/stats";
import { useSession } from "next-auth/react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
} from "recharts";

const UserStatsPanel = () => {
  const config = useConfigContext();

  const [data, setData] = useState<AllDayStat[]>([]);

  const token = useSession().data?.user.access as string;

  return (
    <Container>
      <Popover>
        <PopoverTrigger>
          <Button
            as={IconButton}
            icon={<Icon boxSize={6} as={IoStatsChartSharp} />}
          ></Button>
        </PopoverTrigger>
        <PopoverContent position={"absolute"} top={0.3 * window.innerHeight}>
          <PopoverCloseButton />
          <PopoverHeader>Statistics Panel</PopoverHeader>
          <PopoverBody>
            <Menu>
              <MenuButton>Choose query type...</MenuButton>
              <MenuList>
                {config !== null &&
                  Object.keys(config["Stats query params"]).map(
                    (param, idx) => (
                      <MenuItem
                        key={idx}
                        onClick={() => {
                          fetchUserStats("", "", "", token)
                            .then((res) => {
                              setData(() => res.data);
                            })
                            .catch((err) => {
                              console.error(err);
                            });
                        }}
                      >
                        {param}
                      </MenuItem>
                    )
                  )}
              </MenuList>
            </Menu>
          </PopoverBody>
          <PopoverBody>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip children={undefined} />
                <Legend />
                <Bar dataKey="correct" stackId="a" fill="#8884d8" />
                <Bar dataKey="incorrect" stackId="a" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Container>
  );
};

export default UserStatsPanel;
